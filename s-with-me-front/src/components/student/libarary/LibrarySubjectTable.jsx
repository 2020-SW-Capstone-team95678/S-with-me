import React from 'react';

import Table from '../../../common-ui/table/Table';
import TableBody from '../../../common-ui/table/TableBody';
import TableRow from '../../../common-ui/table/TableRow';
import TableCell from '../../../common-ui/table/TableCell';
import Button from '../../../common-ui/Button';

export default function LibrarySubjectTable(props) {
  return (
    <Table>
      <TableBody>
        {props.subjectList.map((subject, index) => (
          <TableRow key={index}>
            <TableCell>
              <Button>{subject}</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
