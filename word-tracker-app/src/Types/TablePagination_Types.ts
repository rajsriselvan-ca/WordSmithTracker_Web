import {TablePaginationConfig } from "antd";

export interface PaginationConfig extends TablePaginationConfig {
    current?: number;
  }