import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from '../../../common-ui/table/Table';
import TableBody from '../../../common-ui/table/TableBody';
import TableRow from '../../../common-ui/table/TableRow';
import TableCell from '../../../common-ui/table/TableCell';

export default class LibraryFolderTable extends PureComponent {
  static propTypes = {
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  };

  render() {
    const { folders } = this.props;
    return (
      <Table>
        <TableBody>
          {folders.map(({ id, name }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
