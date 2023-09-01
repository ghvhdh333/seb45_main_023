package com.marbleUs.marbleUs.image;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService service;


    @PostMapping
    public ResponseEntity submitFiles (@RequestPart("images") List<MultipartFile> multipartFileList) throws IOException {
        service.submitFiles(multipartFileList);

        return new ResponseEntity<>("image is saved", HttpStatus.OK);
    }


}
