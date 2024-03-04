package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.daos.DataDictDao;
import cn.luixtech.passport.server.persistence.tables.pojos.DataDict;
import cn.luixtech.passport.server.service.DataDictService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import static cn.luixtech.passport.server.persistence.Tables.USER;
import static cn.luixtech.passport.server.persistence.tables.DataDict.DATA_DICT;
import static cn.luixtech.passport.server.utils.sort.JooqSortUtils.buildOrderBy;


@Service
@AllArgsConstructor
public class DataDictServiceImpl implements DataDictService {
    private final DSLContext  dslContext;
    private final DataDictDao dataDictDao;

    @Override
    public Page<DataDict> find(Pageable pageable, String categoryCode, Boolean enabled) {
        Condition condition = DSL.trueCondition();
        if (StringUtils.isNotEmpty(categoryCode)) {
            condition = condition.and(DATA_DICT.CATEGORY_CODE.eq(categoryCode));
        }
        if (enabled != null) {
            condition = condition.and(DATA_DICT.ENABLED.eq(enabled));
        }

        List<DataDict> domains = dslContext.selectFrom(Tables.DATA_DICT)
                .where(condition)
                .orderBy(buildOrderBy(pageable.getSort(), USER.fields()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchInto(DataDict.class);
        return new PageImpl<>(domains, pageable, dataDictDao.count());
    }

    @Override
    public void batchUpdateCategoryCode(List<String> ids, String targetCategoryCode) {
        dslContext.update(Tables.DATA_DICT)
                .set(DATA_DICT.CATEGORY_CODE, targetCategoryCode)
                .where(DATA_DICT.ID.in(ids))
                .execute();
    }
}
