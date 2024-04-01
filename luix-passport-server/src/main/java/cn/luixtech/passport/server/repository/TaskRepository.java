package cn.luixtech.passport.server.repository;

import cn.luixtech.passport.server.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Task} entity.
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, String> {

}
