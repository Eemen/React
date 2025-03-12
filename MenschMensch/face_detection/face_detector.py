import cv2
import sys
import numpy as np

def add_watermark(image, watermark_number=1):
    # Dictionary of watermark paths
    watermark_paths = {
        1: "face_detection\\watermarks\\WI_50.png",
        2: "face_detection\\watermarks\\50_MO.png",
        3: "face_detection\\watermarks\\50_CI.png"
    }
    
    # Get the correct watermark path
    watermark_path = watermark_paths.get(watermark_number, watermark_paths[1])  # Default to 1 if invalid number
    
    # Read the watermark image with alpha channel
    watermark = cv2.imread(watermark_path, cv2.IMREAD_UNCHANGED)
    if watermark is None:
        print(f"Error: Could not load watermark image {watermark_path}")
        return image
    
    # Get dimensions
    img_h, img_w = image.shape[:2]
    
    # Always resize watermark to desired size
    desired_height = int(img_h / 2.4)  # Convert to integer after division
    ratio = desired_height / watermark.shape[0]
    new_width = int(watermark.shape[1] * ratio)
    watermark = cv2.resize(watermark, (new_width, desired_height))
    
    # Get watermark dimensions
    wm_h, wm_w = watermark.shape[:2]
    
    # Calculate position (completely at bottom left)
    pos_x = 0  # No padding from left
    pos_y = img_h - wm_h  # No padding from bottom
    
    # Create ROI
    roi = image[pos_y:pos_y + wm_h, pos_x:pos_x + wm_w]
    
    # Extract alpha channel from watermark
    if watermark.shape[2] == 4:
        alpha = watermark[:, :, 3] / 255.0
        alpha = cv2.merge([alpha, alpha, alpha, alpha])
        watermark_bgra = watermark[:, :, :4]
        
        # Blend watermark with ROI
        blended = (1 - alpha) * roi + alpha * watermark_bgra
        
        # Place the blended image back into the main image
        image[pos_y:pos_y + wm_h, pos_x:pos_x + wm_w] = blended
    
    return image

def detect_faces(image_path, watermark_number=1):
    # Read the image
    image = cv2.imread(image_path)
    if image is None:
        print("Error: Could not load image")
        return
    
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Load the face cascade classifier
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    # Detect faces
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
    )
    
    # If no faces detected, process the skeleton image
    if len(faces) == 0:
        # Load skeleton image
        skeleton = cv2.imread("face_detection\\skeleton.jpg")
        if skeleton is None:
            print("Error: Could not load skeleton image")
            return
            
        # Create a mask for circular crop (centered)
        h, w = skeleton.shape[:2]
        mask = np.zeros((h, w), dtype=np.uint8)
        center = (w//2, h//2)
        radius = min(w, h)//3  # Using 1/3 of the smallest dimension
        cv2.circle(mask, center, radius, (255, 255, 255), -1)
        
        # Create BGRA image
        result = cv2.cvtColor(skeleton, cv2.COLOR_BGR2BGRA)
        
        # Set alpha channel based on mask
        result[:, :, 3] = mask
        
        # Crop the result to show only the relevant part
        padding = 20
        crop_result = result[
            max(0, center[1] - radius - padding):min(result.shape[0], center[1] + radius + padding),
            max(0, center[0] - radius - padding):min(result.shape[1], center[0] + radius + padding)
        ]
        
        # Add watermark
        crop_result = add_watermark(crop_result, watermark_number)
        
        # Display and save
        cv2.imshow('Circular Portrait', crop_result)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        cv2.imwrite('circular_portrait.png', crop_result)
        return
    
    # Process each detected face
    for (x, y, w, h) in faces:
        # Create a mask for circular crop
        mask = np.zeros(image.shape[:2], dtype=np.uint8)
        center = (x + w//2, y + h//2)
        radius = min(w, h)//2
        cv2.circle(mask, center, radius, (255, 255, 255), -1)
        
        # Convert mask to 3 channel
        mask_3channel = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
        
        # Create BGRA image (BGR + Alpha channel)
        result = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
        
        # Set alpha channel based on mask
        result[:, :, 3] = mask
        
        # Crop the result to show only the relevant part
        padding = 20  # Padding around the circular face
        crop_result = result[
            max(0, center[1] - radius - padding):min(result.shape[0], center[1] + radius + padding),
            max(0, center[0] - radius - padding):min(result.shape[1], center[0] + radius + padding)
        ]
        
        # Add watermark with selected number
        crop_result = add_watermark(crop_result, watermark_number)
        
        # Display the result (note: imshow might not show transparency correctly)
        cv2.imshow('Circular Face Portrait', crop_result)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        
        # Save the result as PNG to preserve transparency
        cv2.imwrite('circular_portrait.png', crop_result)

if __name__ == "__main__":
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("Usage: python face_detector.py <image_path> [watermark_number]")
        print("watermark_number: 1, 2, or 3 (default: 1)")
        sys.exit(1)
        
    image_path = sys.argv[1]
    watermark_number = 1  # default value
    
    if len(sys.argv) == 3:
        try:
            watermark_number = int(sys.argv[2])
            if watermark_number not in [1, 2, 3]:
                print("Warning: Watermark number must be 1, 2, or 3. Using default (1)")
                watermark_number = 1
        except ValueError:
            print("Warning: Invalid watermark number. Using default (1)")
    
    detect_faces(image_path, watermark_number) 