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
import org.jooq.TableLike;
import org.jooq.impl.DSL;
import org.springframework.stereotype.Service;

import static cn.luixtech.passport.server.persistence.tables.SeqNumber.SEQ_NUMBER;


@Service
@AllArgsConstructor
@Slf4j
public class SeqNumberServiceImpl implements SeqNumberService {
    private DSLContext   dslContext;
    private SeqNumberDao seqNumberDao;

    @Override
    public void init() {
        upsertSeqNumber(Tables.DATA_DICT);
    }

    @Override
    public long getNextSeqNumber(String tableName) {
        SeqNumber seqNumber = dslContext.selectFrom(Tables.SEQ_NUMBER)
                .where(SEQ_NUMBER.TABLE_NAME.eq(tableName))
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

    private void upsertSeqNumber(TableLike<?> table) {
        String maxNumberStr = getMaxNumberStr(table);
        if (StringUtils.isEmpty(maxNumberStr)) {
            // insert
            SeqNumber seqNumber = new SeqNumber();
            seqNumber.setId(String.valueOf(IdGenerator.generateShortId()));
            seqNumber.setTableName(table.asTable().getName());
            seqNumber.setMaxSeqNum(0L);
            seqNumberDao.insert(seqNumber);
            return;
        }
        long maxValue = Long.parseLong(maxNumberStr.substring(3));
        log.info("Current table {}'s max number is {}", table, maxValue);

        // update
        SeqNumber seqNumber = dslContext.selectFrom(Tables.SEQ_NUMBER)
                .where(SEQ_NUMBER.TABLE_NAME.eq(table.asTable().getName()))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(SeqNumber.class);
        if (seqNumber == null) {
            throw new IllegalStateException("Failed to get the record");
        }
        seqNumber.setMaxSeqNum(maxValue);
        seqNumberDao.update(seqNumber);
    }

    private String getMaxNumberStr(TableLike<?> table) {
        Record exsitingRecord = dslContext.selectFrom(table)
                .orderBy(DSL.field("num desc"))
                .limit(1)
                .fetchOne();
        return exsitingRecord == null ? null : (String) exsitingRecord.get(DSL.field("num"));
    }
}
