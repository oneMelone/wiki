package com.onemelon.wiki.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.onemelon.wiki.domain.Ebook;
import com.onemelon.wiki.domain.EbookExample;
import com.onemelon.wiki.mapper.EbookMapper;
import com.onemelon.wiki.req.EbookReq;
import com.onemelon.wiki.resp.EbookResp;
import com.onemelon.wiki.resp.PageResp;
import com.onemelon.wiki.util.CopyUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.List;

@Service
public class EbookService {
    @Resource
    private EbookMapper ebookMapper;

    public PageResp<EbookResp> list(EbookReq req) {
        EbookExample ebookExample = new EbookExample();
        EbookExample.Criteria criteria = ebookExample.createCriteria();
        if (!ObjectUtils.isEmpty(req.getName())) {
            criteria.andNameLike("%" + req.getName() + "%");
        }

        PageHelper.startPage(req.getPage(), req.getSize());
        List<Ebook> ebookList = ebookMapper.selectByExample(ebookExample);

        PageInfo<Ebook> pageInfo = new PageInfo<>(ebookList);
        PageResp<EbookResp> pageResp = new PageResp<>();
        List<EbookResp> list =  CopyUtil.copyList(ebookList, EbookResp.class);
        pageResp.setTotal(pageInfo.getTotal());
        pageResp.setList(list);
        return pageResp;
    }
}
