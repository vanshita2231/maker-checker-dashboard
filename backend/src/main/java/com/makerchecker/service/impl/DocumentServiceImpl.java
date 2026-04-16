package com.makerchecker.service.impl;

import com.makerchecker.domain.Document;
import com.makerchecker.domain.enums.ApprovalStatus;
import com.makerchecker.dto.DocumentDTO;
import com.makerchecker.dto.ReviewDTO;
import com.makerchecker.repository.DocumentRepository;
import com.makerchecker.service.DocumentService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Override
    public Document submitDocument(DocumentDTO dto, MultipartFile file) throws IOException {
        // Save uploaded file
        File uploadDir = new File(System.getProperty("user.dir"), "uploads");
        if (!uploadDir.exists()) uploadDir.mkdirs();

        File dest = new File(uploadDir, file.getOriginalFilename());
        file.transferTo(dest.getAbsoluteFile());

        // Create document record
        Document document = new Document();
        document.setCompanyName(dto.getCompanyName());
        document.setPanNumber(dto.getPanNumber());
        document.setTinNumber(dto.getTinNumber());
        document.setGstNumber(dto.getGstNumber());
        document.setDocumentUrl(dest.getAbsolutePath());
        document.setApprovalStatus(ApprovalStatus.PENDING);
        document.setCreatedAt(LocalDateTime.now());

        return documentRepository.save(document);
    }

    @Override
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    @Override
    public List<Document> getPendingDocuments() {
        return documentRepository.findByApprovalStatus(ApprovalStatus.PENDING);
    }

    @Override
    public Document reviewDocument(Long id, ReviewDTO reviewDTO) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));

        document.setApprovalStatus(ApprovalStatus.valueOf(reviewDTO.getStatus()));
        document.setRemarks(reviewDTO.getRemarks());
        document.setApprovedDate(LocalDateTime.now());

        return documentRepository.save(document);
    }

    @Override
    public Document getDocumentById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));
    }
}
