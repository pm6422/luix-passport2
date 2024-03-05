package cn.luixtech.passport.server.repository;

import cn.luixtech.passport.server.domain.UserPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link UserPhoto} entity.
 */
@Repository
public interface UserPhotoRepository extends JpaRepository<UserPhoto, String> {

}
