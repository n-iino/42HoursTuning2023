set global slow_query_log=1;
set global long_query_time=1;

create index user_id_index on match_group_member(user_id);
