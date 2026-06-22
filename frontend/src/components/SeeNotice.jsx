import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper, Button, Box } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';

const SeeNotice = () => {
    const dispatch = useDispatch();
    const [showAll, setShowAll] = React.useState(false);

    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector(state => state.notice);

    useEffect(() => {
        // Guard: wait for currentUser to load
        if (!currentUser) return;

        if (currentRole === "Admin") {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        } else {
            dispatch(getAllNotices(currentUser.school?._id, "Notice"));
        }
    }, [
        dispatch,
        currentRole,
        currentUser?._id,
        currentUser?.school?._id
    ]);

    if (error) {
        console.error("Notice error:", error);
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = Array.isArray(noticesList)
        ? noticesList.map((notice) => {
            const date = new Date(notice.date);
            const dateString = isNaN(date.getTime())
                ? "Invalid Date"
                : date.toISOString().substring(0, 10);

            return {
                title: notice.title,
                details: notice.details,
                date: dateString,
                id: notice._id,
            };
        })
        : [];

    const displayedRows = showAll ? noticeRows : noticeRows.slice(0, 5);

    return (
        <div style={{ marginRight: '20px' }}>
            {loading ? (
                <div style={{ fontSize: '20px' }}>Loading...</div>
            ) : response ? (
                <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
            ) : (
                <>
                    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
                        {displayedRows.length > 0 && (
                            <TableViewTemplate columns={noticeColumns} rows={displayedRows} hidePagination={true} />
                        )}
                        {noticeRows.length > 5 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                <Button variant="outlined" onClick={() => setShowAll(!showAll)}>
                                    {showAll ? 'Show Less' : 'View All'}
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </>
            )}
        </div>
    );
};

export default SeeNotice;
