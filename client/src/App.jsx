import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [viewingTask, setViewingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:5000/api/tasks');
        setTasks(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTask) {
            await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, { title, description, dueDate });
            setEditingTask(null);
        } else {
            await axios.post('http://localhost:5000/api/tasks', { title, description, dueDate });
        }
        setTitle('');
        setDescription('');
        setDueDate('');
        fetchTasks();
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate.split('T')[0]); 
        setEditingTask(task);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks();
    };

    const handleView = (task) => {
        setViewingTask(task);
    };

    const handleCloseModal = () => {
        setViewingTask(null);
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl mb-4  text-center">Task Management App</h1>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-2">
                    <label className="block">Title</label>
                    <input type="text" placeholder="Enter title of task" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded-md " />
                </div>
                <div className="mb-2">
                    <label className="block">Description</label>
                    <textarea value={description} placeholder="Enter description of task    "onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
                <div className="mb-2">
                    <label className="block">Due Date</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
                {/* <button type="submit" className="p-2  bg-blue-500 text-white">{editingTask ? 'Update Task' : 'Add Task'}</button> */}
                <div className="flex justify-center m-4">
                    <button type="submit" className="p-2 w-48 rounded-md border border-blue-500  hover:bg-blue-500 hover:text-white transition duration-200">
                    {editingTask ? 'Update Task' : 'Add Task'}
                    </button>
                </div>
            </form>
            <div>
                {tasks.map((task) => (
                <div key={task._id} className="m-2 p-4 h-36 w-64 inline-block rounded-xl border-2 border-slate-300 bg-slate-100">
                    <h2 className=" truncate">{task.title}</h2>
                    <div className='mt-10'>
                        <button onClick={() => handleView(task)} className="mr-8 p-2 w-12 text-sm rounded-md border border-blue-500  hover:bg-blue-500 hover:text-white transition duration-200">View</button>
                        <button onClick={() => handleEdit(task)} className="mr-8 p-2 w-12 text-sm rounded-md border border-orange-500  hover:bg-orange-500 hover:text-white transition duration-200">Edit</button>
                        <button onClick={() => handleDelete(task._id)} className="p-2 text-sm rounded-md border border-red-500  hover:bg-red-500 hover:text-white transition duration-200 ">Delete</button>
                    </div>
                </div>
            ))}

            </div>
            {viewingTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-white p-4 rounded-md w-2/5">
                        <h2 className="text-2xl mb-4">{viewingTask.title}</h2>
                        <p className="mb-2"><strong>Description:</strong> {viewingTask.description}</p>
                        <p className="mb-4"><strong>Due Date:</strong> {new Date(viewingTask.dueDate).toLocaleDateString()}</p>
                        <button onClick={handleCloseModal} className="p-2 float-right rounded-md border border-slate-500  hover:bg-slate-500 hover:text-white transition duration-200">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
