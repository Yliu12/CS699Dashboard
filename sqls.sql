select * from cs699.mac_report order by MR_USERNAME desc;

select * from cs699.mac_report2 as init where MR_USERNAME = "swu" 
 
GROUP BY MR_MAC 
ORDER BY Magnitude;


select DISTINCT MR_MAC, MR_IP
 from cs699.mac_report2 where MR_USERNAME = "swu";


select *
 from cs699.mac_report2 where MR_USERNAME = "swu";
 
 
SELECT MR_USERNAME, COUNT(*) AS magnitude 
FROM cs699.mac_report2 
GROUP BY MR_USERNAME 
ORDER BY magnitude DESC
LIMIT 20;

CREATE TABLE  yliu12.HOURLY_SUMMERY(
USER_COUNT VARCHAR(30),
MR_HOUR datetime,
DEVICE_COUNT varchar(30)
)