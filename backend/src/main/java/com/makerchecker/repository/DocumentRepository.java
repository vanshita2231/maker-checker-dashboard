package com.makerchecker.repository;

import com.makerchecker.domain.Document;
import com.makerchecker.domain.enums.ApprovalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByApprovalStatus(ApprovalStatus approvalStatus);

    List<Document> findByCompanyName(String companyName);
}
