package com.makerchecker.service;

import com.makerchecker.domain.Document;
import com.makerchecker.dto.DocumentDTO;
import com.makerchecker.dto.ReviewDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DocumentService {

    Document submitDocument(DocumentDTO dto, MultipartFile file) throws IOException;

    List<Document> getAllDocuments();

    List<Document> getPendingDocuments();

    Document reviewDocument(Long id, ReviewDTO reviewDTO);

    Document getDocumentById(Long id);
}
