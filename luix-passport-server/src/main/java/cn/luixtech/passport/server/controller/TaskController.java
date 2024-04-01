package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.domain.Task;
import cn.luixtech.passport.server.repository.TaskRepository;
import com.alibaba.fastjson2.JSON;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
public class TaskController {
    private final TaskRepository taskRepository;

    @Operation(summary = "find task list")
    @GetMapping("/open-api/tasks")
    public ResponseEntity<List<Task>> find() {
        List<Task> domains = taskRepository.findAll();
        return ResponseEntity.ok(domains);
    }

    @Operation(summary = "import tasks", description = "file format should be JSON")
    @PostMapping(value = "/open-api/tasks/import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void importData(@Parameter(description = "file", required = true) @RequestPart MultipartFile file) throws IOException {
        String jsonStr = StreamUtils.copyToString(file.getInputStream(), StandardCharsets.UTF_8);
        List<Task> records = JSON.parseArray(jsonStr, Task.class);
        List<Task> all = new ArrayList<>(records.size());
        records.forEach(record -> {
            record.setId(null);
            all.add(record);
        });
        taskRepository.saveAll(all);
    }
}
