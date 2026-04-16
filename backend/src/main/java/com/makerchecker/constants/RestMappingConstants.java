package com.makerchecker.constants;

public final class RestMappingConstants {

    private RestMappingConstants() {}

    public static final String BASE_API = "/api";
    
    public static final String DOCUMENTS = BASE_API + "/documents";
    public static final String DOCUMENT_SUBMIT = "/submit";
    public static final String DOCUMENT_PENDING = "/pending";
    public static final String DOCUMENT_REVIEW = "/{id}/review";
    public static final String DOCUMENT_BY_ID = "/{id}";
}
