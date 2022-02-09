package com.onemelon.wiki.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.onemelon.wiki.domain.Content;
import com.onemelon.wiki.domain.Doc;
import com.onemelon.wiki.domain.DocExample;
import com.onemelon.wiki.mapper.ContentMapper;
import com.onemelon.wiki.mapper.DocMapper;
import com.onemelon.wiki.req.DocQueryReq;
import com.onemelon.wiki.req.DocSaveReq;
import com.onemelon.wiki.resp.DocQueryResp;
import com.onemelon.wiki.resp.PageResp;
import com.onemelon.wiki.util.CopyUtil;
import com.onemelon.wiki.util.SnowFlake;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class DocService {
    @Resource
    private DocMapper docMapper;

    @Resource
    private ContentMapper contentMapper;

    @Resource
    private SnowFlake snowFlake;

    public PageResp<DocQueryResp> list(DocQueryReq req) {
        DocExample docExample = new DocExample();
        DocExample.Criteria criteria = docExample.createCriteria();

        PageHelper.startPage(req.getPage(), req.getSize());
        List<Doc> docList = docMapper.selectByExample(docExample);

        PageInfo<Doc> pageInfo = new PageInfo<>(docList);
        PageResp<DocQueryResp> pageResp = new PageResp<>();
        List<DocQueryResp> list =  CopyUtil.copyList(docList, DocQueryResp.class);
        pageResp.setTotal(pageInfo.getTotal());
        pageResp.setList(list);
        return pageResp;
    }

    /**
     * 保存
     */
    public void save(DocSaveReq req) {
        Doc doc = CopyUtil.copy(req, Doc.class);
        Content content = CopyUtil.copy(req, Content.class);
        if (ObjectUtils.isEmpty(req.getId())) {
            // 新增
            doc.setId(snowFlake.nextId());
            docMapper.insert(doc);

            content.setId(doc.getId());
            contentMapper.insert(content);
        } else {
            // 更新
            docMapper.updateByPrimaryKey(doc);
            int count = contentMapper.updateByPrimaryKeyWithBLOBs(content);
            if (count == 0) {
                contentMapper.insert(content);
            }
        }
    }

    public void delete(Long id) {
        docMapper.deleteByPrimaryKey(id);
    }

    public void delete(List<String> ids) {
        DocExample docExample = new DocExample();
        DocExample.Criteria criteria  = docExample.createCriteria();
        List<Long> criteriaArr = new ArrayList<>();
        for (String id : ids) {
            criteriaArr.add(Long.valueOf(id));
        }
        criteria.andIdIn(criteriaArr);
        docMapper.deleteByExample(docExample);
    }

    public String findContent(Long id) {
        Content content = contentMapper.selectByPrimaryKey(id);
        if (ObjectUtils.isEmpty(content)) {
            return "";
        }
        return content.getContent();
    }

    public List<DocQueryResp> all(Long ebookId) {
        DocExample docExample = new DocExample();
        docExample.createCriteria().andEbookIdEqualTo(ebookId);
        docExample.setOrderByClause("sort asc");
        List<Doc> docList = docMapper.selectByExample(docExample);

        List<DocQueryResp> list = CopyUtil.copyList(docList, DocQueryResp.class);

        return list;
    }
}
