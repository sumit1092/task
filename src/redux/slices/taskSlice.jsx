import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import privateRequest from '../../api/axiosConfig/privateRequest.jsx';
import {
  TASK,
  ADDTASK,
  MEMBER,
  TASKSTATUSUPDATE,
  TASKARCHIVE,
  LEAD,
} from '../../utility/apiEndpoint.jsx';
import { getToken } from '../../utility/localStorageUtils.jsx';

export const fetchMembers = createAsyncThunk('task/fetchMembers', async () => {
  const res = await privateRequest.get(MEMBER);
  const list = res.data?.data || [];
  return list.map((m) => ({
    id: m.id ?? m.Id ?? m.UserId,
    name: m.name ?? m.Name ?? m.FullName,
  }));
});

export const fetchLeads = createAsyncThunk('task/fetchLeads', async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  const res = await privateRequest.get(LEAD);

  const list = res.data?.data?.Leads || [];
  console.log('list', list);

  return list.map((l) => ({
    id: l.Id,
    name: l.LeadName, 
  }));
});

export const fetchTasks = createAsyncThunk('task/fetchTasks', async (payload = {}) => {
  const res = await privateRequest.post(TASK, payload);
  const data = res.data?.data || {};
  return {
    tasks: data.TaskList || [],
    totalCount: data.TotalCount || 0,
  };
});

export const addTask = createAsyncThunk('task/addTask', async (payload) => {
  const res = await privateRequest.post(ADDTASK, payload);
  return res.data?.data || res.data;
});

export const updateTaskStatus = createAsyncThunk(
  'task/updateTaskStatus',
  async ({ taskId, status }) => {
    const res = await privateRequest.post(TASKSTATUSUPDATE, {
      TaskId: taskId,
      Status: status,
    });
    return res.data;
  }
);

export const deleteTask = createAsyncThunk('task/deleteTask', async (taskId) => {
  const res = await privateRequest.post(TASKARCHIVE, { TaskId: taskId });
  return { taskId, result: res.data };
});

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    totalCount: 0,
    members: [],
    leads: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchMembers.fulfilled, (s, a) => {
        s.members = a.payload;
      })

      .addCase(fetchLeads.fulfilled, (s, a) => {
        s.leads = a.payload;
      })

      .addCase(fetchTasks.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchTasks.fulfilled, (s, a) => {
        s.loading = false;
        s.tasks = a.payload.tasks;
        s.totalCount = a.payload.totalCount;
      })
      .addCase(fetchTasks.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message || 'Failed';
      })

      .addCase(addTask.fulfilled, (s, a) => {
        if (a.payload) {
          s.tasks.unshift(a.payload);
        }
      })

      .addCase(deleteTask.fulfilled, (s, a) => {
        s.tasks = s.tasks.filter(
          (t) => String(t.id ?? t.TaskId) !== String(a.payload.taskId)
        );
      });
  },
});

export default taskSlice.reducer;
