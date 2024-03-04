package cn.luixtech.passport.server.service.impl;


import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.daos.SeqNumberDao;
import cn.luixtech.passport.server.persistence.tables.pojos.SeqNumber;
import cn.luixtech.passport.server.service.SeqNumberService;
import com.luixtech.uidgenerator.core.id.IdGenerator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.Table;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import static cn.luixtech.passport.server.persistence.tables.SeqNumber.SEQ_NUMBER;

@Service
@AllArgsConstructor
@Slf4j
public class SeqNumberServiceImpl implements SeqNumberService {
    private final DSLContext   dslContext;
    private final SeqNumberDao seqNumberDao;

    @Override
    public void init() {
        upsertSeqNumber(Tables.DATA_DICT);
    }

    @Override
    public long getNextSeqNumber(Table table) {
        SeqNumber seqNumber = dslContext.selectFrom(Tables.SEQ_NUMBER)
                .where(SEQ_NUMBER.TABLE_NAME.eq(table.asTable().getName()))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(SeqNumber.class);
        if (seqNumber == null) {
            throw new IllegalStateException("Failed to get the record");
        }
        seqNumber.setMaxSeqNum(seqNumber.getMaxSeqNum() + 1);
        seqNumberDao.update(seqNumber);

        return seqNumber.getMaxSeqNum();
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    protected void upsertSeqNumber(Table table) {
        String maxNumberStr = getMaxNumberStr(table);

        SeqNumber existingOne = dslContext.selectFrom(Tables.SEQ_NUMBER)
                .where(SEQ_NUMBER.TABLE_NAME.eq(table.asTable().getName()))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(SeqNumber.class);
        if (existingOne == null) {
            // insert
            SeqNumber newOne = new SeqNumber();
            newOne.setId(String.valueOf(IdGenerator.generateShortId()));
            newOne.setTableName(table.asTable().getName());
            newOne.setMaxSeqNum(StringUtils.isEmpty(maxNumberStr) ? 0L : Long.parseLong(maxNumberStr.substring(3)));
            seqNumberDao.insert(newOne);
            return;
        }

        // update
        long maxValue = Long.parseLong(maxNumberStr.substring(3));
        log.info("Current table {}'s max number is {}", table, maxValue);

        existingOne.setMaxSeqNum(maxValue);
        seqNumberDao.update(existingOne);
    }

    private String getMaxNumberStr(Table table) {
        Record exsitingRecord = dslContext.selectFrom(table)
                .orderBy(DSL.field("num desc"))
                .limit(1)
                .fetchOne();
        return exsitingRecord == null ? null : (String) exsitingRecord.get(DSL.field("num"));
    }
}
