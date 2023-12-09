package cn.luixtech.passport.server.service.impl;


import cn.luixtech.passport.server.persistence.tables.daos.UserDao;
import cn.luixtech.passport.server.persistence.tables.daos.UserPhotoDao;
import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.persistence.tables.pojos.UserPhoto;
import cn.luixtech.passport.server.service.UserPhotoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserPhotoServiceImpl implements UserPhotoService {
    private final UserPhotoDao userPhotoDao;
    private final UserDao      userDao;

    @Override
    public void insert(String userId, byte[] photoData) {
        userPhotoDao.insert(new UserPhoto(userId, photoData));
    }

    @Override
    public void update(UserPhoto photo, byte[] photoData) {
        photo.setProfilePhoto(photoData);
        userPhotoDao.update(photo);
    }

    @Override
    public void save(User user, byte[] photoData) {
        UserPhoto existingPhoto = userPhotoDao.findById(user.getId());
        if (existingPhoto != null) {
            // Update if exists
            update(existingPhoto, photoData);
        } else {
            // Insert if not exists
            insert(user.getId(), photoData);
            user.setProfilePhotoEnabled(true);
            userDao.update(user);
        }
    }
}
