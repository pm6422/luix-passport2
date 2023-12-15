package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.config.ApplicationProperties;
import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.service.MailService;
import com.resend.Resend;
import com.resend.services.emails.model.SendEmailRequest;
import com.resend.services.emails.model.SendEmailResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.Locale;

/**
 * Service for sending emails.
 */
@Service
@AllArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {
    private static final String                USER     = "user";
    private static final String                BASE_URL = "baseUrl";
    private static final String                DOMAIN   = "domain";
    private final        ApplicationProperties applicationProperties;
    private final        MessageSource         messageSource;
    private final        SpringTemplateEngine  springTemplateEngine;

    /**
     * System default email address that sends the e-mails.
     */
    @Async
    @Override
    public void sendEmail(String[] sendTo, String subject, String content) {
        log.info("Send email to [{}] with subject [{}] and content: {}", sendTo, subject, content);
        try {
            Resend resend = new Resend(applicationProperties.getMail().getResendApiKey());
            SendEmailRequest sendEmailRequest = SendEmailRequest.builder()
                    .from(applicationProperties.getMail().getFromDisplayName() + " <" + applicationProperties.getMail().getFromUsername() + ">")
                    .to(sendTo)
                    .subject(subject)
                    .html(content)
                    .build();
            SendEmailResponse result = resend.emails().send(sendEmailRequest);
            log.info("Sent email to user [{}] with message id [{}]", StringUtils.arrayToCommaDelimitedString(sendTo), result.getId());
        } catch (Exception e) {
            log.error("Failed to send email to user [{}] with exception: {}", sendTo, e.getMessage());
        }
    }

    @Async
    @Override
    public void sendEmailFromTemplate(User user, String templateName, String emailSubjectKey, String baseUrl) {
        Locale locale = Locale.getDefault();
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, baseUrl);
        context.setVariable(DOMAIN, applicationProperties.getCompany().getDomain());
        String content = springTemplateEngine.process(templateName, context);
        String subject = messageSource.getMessage(emailSubjectKey, null, locale);
        sendEmail(new String[]{user.getEmail()}, subject, content);
    }

    @Async
    @Override
    public void sendAccountActivationEmail(User user, String baseUrl) {
        sendEmailFromTemplate(user, "email/activate-account-email", "activate.account.email.subject", baseUrl);
        log.info("Requested sending account activation email to [{}]", user.getEmail());
    }

    @Async
    @Override
    public void sendUserCreationEmail(User user, String baseUrl) {
        sendEmailFromTemplate(user, "email/create-user-email", "create.user.email.subject", baseUrl);
        log.info("Requested sending user creation email to [{}]", user.getEmail());
    }

    @Async
    @Override
    public void sendPasswordRecoveryMail(User user, String baseUrl) {
        sendEmailFromTemplate(user, "email/recover-password-email", "reset.password.email.subject", baseUrl);
        log.info("Requested sending password recovery email to [{}]", user.getEmail());
    }

    @Override
    public void sendPasswordChangedMail(User user, String baseUrl) {
        sendEmailFromTemplate(user, "email/changed-password-email", "changed.password.email.subject=", baseUrl);
        log.info("Requested sending password changed email to [{}]", user.getEmail());
    }
}
