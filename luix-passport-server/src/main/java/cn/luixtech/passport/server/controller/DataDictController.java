package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.daos.DataDictDao;
import cn.luixtech.passport.server.persistence.tables.pojos.DataDict;
import cn.luixtech.passport.server.pojo.BatchUpdateDataDict;
import cn.luixtech.passport.server.service.DataDictService;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONWriter;
import com.luixtech.utilities.exception.DataNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.jooq.DSLContext;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static com.luixtech.springbootframework.utils.HttpHeaderUtils.generatePageHeaders;

@RestController
@AllArgsConstructor
@Slf4j
@Tag(name = "20.应用配置-数据字典")
public class DataDictController {
    private       DSLContext      dslContext;
    private final DataDictDao     dataDictDao;
    private final DataDictService dataDictService;

    @Operation(summary = "create new data dict")
    @PostMapping("/api/data-dicts")
    public ResponseEntity<Void> create(@Parameter(description = "domain", required = true) @Valid @RequestBody DataDict domain) {
        log.debug("REST request to create data dict: {}", domain);
        dataDictDao.insert(domain);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "find data dict list")
    @GetMapping("/api/data-dicts")
    public ResponseEntity<List<DataDict>> find(@ParameterObject Pageable pageable,
                                               @Parameter(description = "分类代码") @RequestParam(value = "categoryCode", required = false) String categoryCode,
                                               @Parameter(description = "是否可用") @RequestParam(value = "enabled", required = false) Boolean enabled) {
        Page<DataDict> domains = dataDictService.find(pageable, categoryCode, enabled);
        return ResponseEntity.ok().headers(generatePageHeaders(domains)).body(domains.getContent());
    }

    @Operation(summary = "find data dict by id")
    @GetMapping("/api/data-dicts/{id}")
    public ResponseEntity<DataDict> findById(@Parameter(description = "ID", required = true) @PathVariable String id) {
        DataDict domain = Optional.ofNullable(dataDictDao.findById(id)).orElseThrow(() -> new DataNotFoundException(id));
        return ResponseEntity.ok(domain);
    }

    @Operation(summary = "update data dict")
    @PutMapping("/api/data-dicts")
    public ResponseEntity<Void> update(@Parameter(description = "domain", required = true) @Valid @RequestBody DataDict domain) {
        dataDictDao.update(domain);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "batch update data dict")
    @PutMapping("/api/data-dicts/batch-update")
    public ResponseEntity<Void> batchUpdate(@Parameter(description = "target", required = true) @Valid @RequestBody BatchUpdateDataDict target) {
        dataDictService.batchUpdateCategoryCode(target.getIds(), target.getTargetCategoryCode());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "delete data dict by id")
    @DeleteMapping("/api/data-dicts/{id}")
    public ResponseEntity<Void> delete(@Parameter(description = "ID", required = true) @PathVariable String id) {
        dataDictDao.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "import data dicts", description = "file format should be JSON")
    @PostMapping(value = "/api/data-dicts/import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void importData(@Parameter(description = "file", required = true) @RequestPart MultipartFile file) throws IOException {
        String jsonStr = StreamUtils.copyToString(file.getInputStream(), StandardCharsets.UTF_8);
        List<DataDict> records = JSON.parseArray(jsonStr, DataDict.class);
        List<DataDict> all = new ArrayList<>(records.size());
        records.forEach(record -> {
            record.setId(null);
            record.setCreatedTime(LocalDateTime.now());
            record.setModifiedTime(record.getCreatedTime());
            all.add(record);
        });
        dataDictDao.insert(all);
    }

    @Operation(summary = "download import template")
    @GetMapping("/api/data-dicts/import-template")
    public ResponseEntity<ByteArrayResource> getImportTemplate() {
        List<DataDict> domains = dslContext.selectFrom(Tables.DATA_DICT)
                .limit(1)
                .fetchInto(DataDict.class);
        byte[] data = JSON.toJSONString(domains, JSONWriter.Feature.PrettyFormat).getBytes();
        ByteArrayResource resource = new ByteArrayResource(data);
        String fileName = "data-dict-" + DateFormatUtils.ISO_8601_EXTENDED_DATE_FORMAT.format(new Date()) + ".json";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + fileName)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(data.length)
                .body(resource);
    }
}
