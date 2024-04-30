package cn.luixtech.passport.server.service.impl;


import cn.luixtech.passport.server.domain.User;
import cn.luixtech.passport.server.domain.UserPhoto;
import cn.luixtech.passport.server.repository.UserPhotoRepository;
import cn.luixtech.passport.server.repository.UserRepository;
import cn.luixtech.passport.server.service.UserPhotoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserPhotoServiceImpl implements UserPhotoService {
    private final UserPhotoRepository userPhotoRepository;
    private final UserRepository      userRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void insert(String userId, byte[] photoData) {
        UserPhoto userPhoto = new UserPhoto();
        userPhoto.setId(userId);
        userPhoto.setPhoto(photoData);
        userPhotoRepository.save(userPhoto);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void update(UserPhoto photo, byte[] photoData) {
        photo.setPhoto(photoData);
        userPhotoRepository.save(photo);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void save(User user, byte[] photoData) {
        Optional<UserPhoto> existingOne = userPhotoRepository.findById(user.getId());
        if (existingOne.isPresent()) {
            // update if exists
            update(existingOne.get(), photoData);
        } else {
            // insert if not exists
            insert(user.getId(), photoData);
        }
    }
}
