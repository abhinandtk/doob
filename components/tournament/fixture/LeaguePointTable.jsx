import { Table } from "antd";
import React from "react";
import { Fragment } from "react";
import Axios from "axios";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import { useRouter } from "next/router";
import constants from "@/public/data/my-constants/Constants";
import { useState } from "react";
import { useTranslation } from "next-i18next";

function LeaguePointTable() {
  const {t}=useTranslation()
  const router = useRouter();
  const { tid } = router.query;
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    Axios.post(
      apis.leagueTable,
      {
        tournament_slug: tid,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setTableData(res.data.league_table);

      console.log("rrrrrrrrrrrrrr3", res);
    });
  }, [tid]);

  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Matches",
      dataIndex: "matches",
      key: "matches",
    },
    {
      title: "Won",
      dataIndex: "won",
      key: "won",
    },
    {
      title: "Drawn",
      dataIndex: "drawn",
      key: "drawn",
    },
    {
      title: "Lost",
      dataIndex: "lost",
      key: "lost",
    },
    {
      title: t("Goals"),
      dataIndex: "goals",
      key: "goals",
    },
    {
      title: t("Points"),
      dataIndex: "points",
      key: "points",
    },
  ];

  const data =
    tableData &&
    tableData.map((item, index) => ({
      key: index + 1, // Provide a unique key for each table row
      position: index + 1,
      team: `${item.team.team} ${
        item.team.team_2 ? " & " + item.team.team_2 : ""
      }`,
      matches: item.matches,
      won: item.won,
      drawn: item.drawn,
      lost: item.lost,
      goals: item.goals,
      points: item.points,
    }));

  // Add more teams here

  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ width: "100%", overflowX: "scroll" }}
      />
    </Fragment>
  );
}

export default LeaguePointTable;
