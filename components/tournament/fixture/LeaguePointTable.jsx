import { Table } from "antd";
import React from "react";
import { Fragment } from "react";

function LeaguePointTable() {
    const columns = [
        {
          title: 'Position',
          dataIndex: 'position',
          key: 'position',
        },
        {
          title: 'Team',
          dataIndex: 'team',
          key: 'team',
        },
        {
          title: 'Played',
          dataIndex: 'played',
          key: 'played',
        },
        {
          title: 'Won',
          dataIndex: 'won',
          key: 'won',
        },
        {
          title: 'Drawn',
          dataIndex: 'drawn',
          key: 'drawn',
        },
        {
          title: 'Lost',
          dataIndex: 'lost',
          key: 'lost',
        },
        {
          title: 'Points',
          dataIndex: 'points',
          key: 'points',
        },
        
        
      ];
      
      const data = [
        {
          key: '1',
          team: 'Team A',
          position:1,
          played: 10,
          won: 7,
          drawn: 2,
          lost: 1,
          points: 23,
        },
        {
          key: '2',
          position:2,
          team: 'Team B',
          played: 10,
          won: 6,
          drawn: 3,
          lost: 1,
          points: 21,
        },
        // Add more teams here
      ];
  return <Fragment>
    <Table columns={columns} dataSource={data} pagination={false} style={{width:'100%',overflowX:'scroll'}}/>
  </Fragment>;
}

export default LeaguePointTable;
