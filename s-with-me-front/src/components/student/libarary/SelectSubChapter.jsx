import React from 'react';
import Select, { Option } from '../../../common-ui/Select';

export default function SelectSubChapter(props) {
  const { mainChapterId: selected, chapterList, onChange } = props;
  const filteredList = chapterList.map(({ subChapters }) => {
    const result = subChapters.filter(({ mainChapterId }) => mainChapterId === selected * 1);
    return result;
  });
  const resultList = filteredList.filter(item => item.length > 0)[0];
  console.log(resultList);
  return (
    <Select name="selectSubChapterId" onChange={onChange}>
      <Option label="선택해 주세요" value="" />
      {resultList ? (
        resultList.map(subChapter => (
          <Option label={subChapter.subChapterName} value={subChapter.subChapterId} />
        ))
      ) : (
        <Option label="해당하는 소단원이 없습니다." value="" />
      )}
    </Select>
  );
}
