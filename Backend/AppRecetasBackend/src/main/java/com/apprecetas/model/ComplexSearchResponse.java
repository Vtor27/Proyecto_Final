package com.apprecetas.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComplexSearchResponse {
	
	private List<RecetaExtendidaDTO> results;
	
	private int offset;
	
	private int number;
	
	private int totalResults;
}
