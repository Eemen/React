from flask import Flask, request, jsonify, send_file, render_template
import cv2
import numpy as np
import os
from werkzeug.utils import secure_filename
import io
import base64

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

def add_watermark(image, watermark_number=1):
    # Dictionary of watermark paths
    watermark_paths = {
        1: "face_detection/watermarks/WI_50.png",
        2: "face_detection/watermarks/50_MO.png",
        3: "face_detection/watermarks/50_CI.png"
    }
    
    watermark_path = watermark_paths.get(watermark_number, watermark_paths[1])
    watermark = cv2.imread(watermark_path, cv2.IMREAD_UNCHANGED)
    if watermark is None:
        print(f"Error: Could not load watermark image {watermark_path}")
        return image
    
    img_h, img_w = image.shape[:2]
    desired_height = int(img_h / 2.4)
    ratio = desired_height / watermark.shape[0]
    new_width = int(watermark.shape[1] * ratio)
    watermark = cv2.resize(watermark, (new_width, desired_height))
    
    wm_h, wm_w = watermark.shape[:2]
    pos_x = 0
    pos_y = img_h - wm_h
    
    roi = image[pos_y:pos_y + wm_h, pos_x:pos_x + wm_w]
    
    if watermark.shape[2] == 4:
        alpha = watermark[:, :, 3] / 255.0
        alpha = cv2.merge([alpha, alpha, alpha, alpha])
        watermark_bgra = watermark[:, :, :4]
        blended = (1 - alpha) * roi + alpha * watermark_bgra
        image[pos_y:pos_y + wm_h, pos_x:pos_x + wm_w] = blended
    
    return image

def process_image(image_path, watermark_number):
    image = cv2.imread(image_path)
    if image is None:
        return None
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
    )
    
    if len(faces) == 0:
        # Create a blank gray image of size 325x325
        gray_image = np.full((325, 325, 3), (128, 128, 128), dtype=np.uint8)
        
        # Create a mask for the circle
        mask = np.zeros((325, 325), dtype=np.uint8)
        center = (325//2, 325//2)
        radius = 325//3
        cv2.circle(mask, center, radius, (255, 255, 255), -1)
        
        # Convert to BGRA
        result = cv2.cvtColor(gray_image, cv2.COLOR_BGR2BGRA)
        result[:, :, 3] = mask
        
        return add_watermark(result, watermark_number)
    
    for (x, y, w, h) in faces:
        mask = np.zeros(image.shape[:2], dtype=np.uint8)
        center = (x + w//2, y + h//2)
        # Increase radius to include more background
        radius = int(max(w, h) * 0.7)  # Using 0.7 instead of 0.5 to make the face circle bigger
        cv2.circle(mask, center, radius, (255, 255, 255), -1)
        
        result = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
        result[:, :, 3] = mask
        
        # Increase padding to include more background
        padding = int(radius * 0.5)  # Increased padding relative to radius
        crop_result = result[
            max(0, center[1] - radius - padding):min(result.shape[0], center[1] + radius + padding),
            max(0, center[0] - radius - padding):min(result.shape[1], center[0] + radius + padding)
        ]
        
        # Resize the result to 325x325
        resized_result = cv2.resize(crop_result, (325, 325))
        return add_watermark(resized_result, watermark_number)
    
    return None

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'API is running'
    })

@app.route('/api/process', methods=['POST'])
def process():
    try:
        # Check if a file is uploaded
        if 'file' in request.files and request.files['file']:
            file = request.files['file']
            # Read file directly into memory
            file_bytes = file.read()
            nparr = np.frombuffer(file_bytes, np.uint8)
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            if image is None:
                return jsonify({'error': 'Error decoding image file', 'status': 'error'}), 400
            watermark_number = int(request.form.get('watermark', 1))
        elif 'image' in request.json:
            # Handle base64 image
            image_data = request.json['image']
            image_data = base64.b64decode(image_data)
            image_array = np.frombuffer(image_data, np.uint8)
            image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
            if image is None:
                return jsonify({'error': 'Error decoding base64 image', 'status': 'error'}), 400
            watermark_number = int(request.json.get('watermark', 1))
        else:
            return jsonify({'error': 'No file or image provided', 'status': 'error'}), 400

        # Process the image directly from memory
        result = process_image_from_array(image, watermark_number)

        if result is None:
            return jsonify({'error': 'Error processing image', 'status': 'error'}), 500

        # Convert the image to base64
        _, img_encoded = cv2.imencode('.png', result)
        img_base64 = base64.b64encode(img_encoded.tobytes()).decode('utf-8')

        return jsonify({
            'status': 'success',
            'image': img_base64,
            'message': 'Image processed successfully'
        })

    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

def process_image_from_array(image, watermark_number):
    if image is None:
        return None
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
    )
    
    if len(faces) == 0:
        # Create a blank gray image of size 325x325
        gray_image = np.full((325, 325, 3), (128, 128, 128), dtype=np.uint8)
        
        # Create a mask for the circle
        mask = np.zeros((325, 325), dtype=np.uint8)
        center = (325//2, 325//2)
        radius = 325//3
        cv2.circle(mask, center, radius, (255, 255, 255), -1)
        
        # Convert to BGRA
        result = cv2.cvtColor(gray_image, cv2.COLOR_BGR2BGRA)
        result[:, :, 3] = mask
        
        return add_watermark(result, watermark_number)
    
    for (x, y, w, h) in faces:
        mask = np.zeros(image.shape[:2], dtype=np.uint8)
        center = (x + w//2, y + h//2)
        # Increase radius to include more background
        radius = int(max(w, h) * 0.7)  # Using 0.7 instead of 0.5 to make the face circle bigger
        cv2.circle(mask, center, radius, (255, 255, 255), -1)
        
        result = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
        result[:, :, 3] = mask
        
        # Increase padding to include more background
        padding = int(radius * 0.5)  # Increased padding relative to radius
        crop_result = result[
            max(0, center[1] - radius - padding):min(result.shape[0], center[1] + radius + padding),
            max(0, center[0] - radius - padding):min(result.shape[1], center[0] + radius + padding)
        ]
        
        resized_result = cv2.resize(crop_result, (325, 325))
        return add_watermark(resized_result, watermark_number)
    
    return None

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
