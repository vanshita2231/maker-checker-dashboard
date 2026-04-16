package com.makerchecker.web.rest;

import com.makerchecker.constants.RestMappingConstants;
import com.makerchecker.domain.Document;
import com.makerchecker.dto.DocumentDTO;
import com.makerchecker.dto.ReviewDTO;
import com.makerchecker.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(RestMappingConstants.DOCUMENTS)
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping(RestMappingConstants.DOCUMENT_SUBMIT)
    public ResponseEntity<Document> submitDocument(
            @RequestParam String companyName,
            @RequestParam(required = false) String panNumber,
            @RequestParam(required = false) String tinNumber,
            @RequestParam(required = false) String gstNumber,
            @RequestParam MultipartFile file) throws IOException {

        DocumentDTO dto = new DocumentDTO();
        dto.setCompanyName(companyName);
        dto.setPanNumber(panNumber);
        dto.setTinNumber(tinNumber);
        dto.setGstNumber(gstNumber);

        return ResponseEntity.ok(documentService.submitDocument(dto, file));
    }

    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments() {
        return ResponseEntity.ok(documentService.getAllDocuments());
    }

    @GetMapping(RestMappingConstants.DOCUMENT_PENDING)
    public ResponseEntity<List<Document>> getPendingDocuments() {
        return ResponseEntity.ok(documentService.getPendingDocuments());
    }

    @GetMapping(RestMappingConstants.DOCUMENT_BY_ID)
    public ResponseEntity<Document> getDocumentById(@PathVariable Long id) {
        return ResponseEntity.ok(documentService.getDocumentById(id));
    }

    @PutMapping(RestMappingConstants.DOCUMENT_REVIEW)
    public ResponseEntity<Document> reviewDocument(
            @PathVariable Long id,
            @RequestBody ReviewDTO reviewDTO) {
        return ResponseEntity.ok(documentService.reviewDocument(id, reviewDTO));
    }
}
