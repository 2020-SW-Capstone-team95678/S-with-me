package com.swithme.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


@Service
public class FileService {
    private final Path fileLocation;
    @Autowired
    public FileService(FileUploadProperties prop) {
        this.fileLocation = Paths.get(prop.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileLocation);
        }catch(Exception e) {
            throw new IllegalArgumentException("no directory.");
        }
    }

    public String storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        // 파일명에 부적합 문자가 있는지 확인한다.
        if(fileName.contains(".."))
            throw new IllegalArgumentException("file name error.");
        Path targetLocation;
        try {

            targetLocation = this.fileLocation.resolve(fileName);

        }catch (Exception e){
            throw new IllegalArgumentException("file upload fail1");
        }
        try {
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            //// 이부분 에서 에러남
            return fileName;
        }catch(Exception e) {

            throw new IllegalArgumentException("file upload fail2 "+targetLocation.toString());
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if(resource.exists()) {
                return resource;
            }else {
                throw new IllegalArgumentException("can't find file");
            }
        }catch(MalformedURLException e) {
            throw new IllegalArgumentException("can't find file");
        }
    }


}
