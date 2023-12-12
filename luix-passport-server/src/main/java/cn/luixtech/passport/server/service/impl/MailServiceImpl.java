package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.service.MailService;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.Locale;

/**
 * Service for sending emails.
 */
@Service
@AllArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {
    private static final String USER     = "user";
    private static final String BASE_URL = "baseUrl";

    private final MailProperties       mailProperties;
    private final JavaMailSenderImpl   javaMailSender;
    private final MessageSource        messageSource;
    private final SpringTemplateEngine springTemplateEngine;

    /**
     * System default email address that sends the e-mails.
     */
    @Async
    @Override
    public void sendEmail(String[] sendTo, String subject, String content, boolean isMultipart, boolean isHtml) {
        log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}", isMultipart,
                isHtml, sendTo, subject, content);
        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(sendTo);
            message.setFrom(mailProperties.getUsername(), "Luixtech Universe");
            message.setSubject(subject);
            message.setText(content, isHtml);
            javaMailSender.send(mimeMessage);
            log.info("Sent email to user '{}'", StringUtils.arrayToCommaDelimitedString(sendTo));
        } catch (Exception e) {
            log.warn("Email could not be sent to user '{}', exception is: {}", sendTo, e.getMessage());
        }
    }

    @Async
    @Override
    public void sendEmailFromTemplate(User user, String templateName, String titleKey, String baseUrl) {
        Locale locale = Locale.SIMPLIFIED_CHINESE;
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, baseUrl);
        String content = springTemplateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(new String[]{user.getEmail()}, subject, content, false, true);
    }

    @Async
    @Override
    public void sendAccountActivationEmail(User user, String baseUrl) {
        sendEmailFromTemplate(user, "email/account-activation-email", "account.activation", baseUrl);
        log.info("Sent account activation email to '{}'", user.getEmail());
    }

    @Async
    @Override
    public void sendUserCreationEmail(User user, String baseUrl) {
        sendEmailFromTemplate(user, "email/user-creation-email", "account.activation", baseUrl);
        log.info("Sent user creation email to '{}'", user.getEmail());
    }

    @Async
    @Override
    public void sendPasswordRecoveryMail(User user, String baseUrl) {
        sendEmailFromTemplate(user, "email/password-reset-email", "password.reset", baseUrl);
        log.info("Sent password recovery email to '{}'", user.getEmail());
    }
}
