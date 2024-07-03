package com.example.demo.api.image;

import jakarta.xml.bind.DatatypeConverter;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Base64;
import java.util.UUID;

@Service
public class ImageService {
    public String uploadDirectory = "src/main/upload/images/";

    // Save image in a local directory
    public String saveImageToStorage(String imageBase64) throws IOException {
        byte[] data = DatatypeConverter.parseBase64Binary(imageBase64);
        String uniqueFileName = UUID.randomUUID()
                                    .toString() + ".png";
        Path uploadPath = Path.of(uploadDirectory);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(uniqueFileName);

        try (OutputStream outputStream = new BufferedOutputStream(Files.newOutputStream(filePath,
                                                                                        StandardOpenOption.CREATE))) {
            outputStream.write(data);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        String outputPath = "upload/images/" + uniqueFileName;
        return outputPath;
    }

    public ArrayList<String> saveAllImagesToStorage(ArrayList<String> images) throws Exception {
        ArrayList<String> pathOfImages = new ArrayList<>();
        for (String image : images) {
            String path = saveImageToStorage(image);
            pathOfImages.add(path);

        }
        return pathOfImages;
    }

    // To view an image
    public String getImage(String imageDirectory) throws IOException {
        Path imagePath = Path.of(imageDirectory);


        if (Files.exists(imagePath)) {
            byte[] fileByes = Files.readAllBytes(imagePath);
            String imgBase64 = Base64.getEncoder()
                                     .encodeToString(fileByes);
            return imgBase64;
        } else {
            return null;
        }
    }

    public ArrayList<String> getAllImages(ArrayList<String> pathOfImages) throws IOException {
        ArrayList<String> images = new ArrayList<>();
        for (String image : pathOfImages) {
            String path = getImage(image);
            pathOfImages.add(path);

        }
        return images;
    }

    // Delete an image
    public String deleteImage(String imageDirectory) throws IOException {
        String[] array = imageDirectory.split("images/");
        String imageName = array[1];
        Path imagePath = Path.of(uploadDirectory, imageName);
        if (Files.exists(imagePath)) {
            Files.delete(imagePath);
            return "Success";
        } else {
            return "Failed"; // Handle missing images
        }
    }
}