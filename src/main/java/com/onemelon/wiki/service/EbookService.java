package com.onemelon.wiki.service;

import com.onemelon.wiki.domain.Ebook;
import com.onemelon.wiki.domain.EbookExample;
import com.onemelon.wiki.mapper.EbookMapper;
import com.onemelon.wiki.req.EbookReq;
import com.onemelon.wiki.resp.EbookResp;
import com.onemelon.wiki.util.CopyUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.List;

@Service
public class EbookService {
    @Resource
    private EbookMapper ebookMapper;

    public List<EbookResp> list(EbookReq req) {
        EbookExample ebookExample = new EbookExample();
        EbookExample.Criteria criteria = ebookExample.createCriteria();
        if (!ObjectUtils.isEmpty(req.getName())) {
            criteria.andNameLike("%" + req.getName() + "%");
        }
        List<Ebook> ebookList = ebookMapper.selectByExample(ebookExample);

        return CopyUtil.copyList(ebookList, EbookResp.class);
    }
}
