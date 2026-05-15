import db from "../config/db.js";


export const createTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      project_id,
      assigned_to,
      status,
      priority,
      due_date,
    } = req.body;

    await db.execute(
      `
      INSERT INTO tasks
      (
        title,
        description,
        project_id,
        assigned_to,
        status,
        priority,
        due_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        description,
        project_id,
        assigned_to,
        status,
        priority,
        due_date,
      ]
    );

    res.status(201).json({
      message:
        "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getTasks = async (
  req,
  res
) => {
  try {
    const [tasks] = await db.execute(`
      SELECT 
        tasks.*,
        users.name AS assigned_user,
        projects.title AS project_name
      FROM tasks
      LEFT JOIN users
      ON tasks.assigned_to = users.id
      LEFT JOIN projects
      ON tasks.project_id = projects.id
      ORDER BY tasks.id DESC
    `);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      due_date,
    } = req.body;

    await db.execute(
      `
      UPDATE tasks
      SET
        title = ?,
        description = ?,
        status = ?,
        priority = ?,
        due_date = ?
      WHERE id = ?
      `,
      [
        title,
        description,
        status,
        priority,
        due_date,
        req.params.id,
      ]
    );

    res.json({
      message:
        "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteTask = async (
  req,
  res
) => {
  try {
    await db.execute(
      `
      DELETE FROM tasks
      WHERE id = ?
      `,
      [req.params.id]
    );

    res.json({
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};