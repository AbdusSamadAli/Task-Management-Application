import db from "../config/db.js";

export const createProject = async (
  req,
  res
) => {
  try {
    const { title, description } =
      req.body;

    await db.execute(
      `
      INSERT INTO projects
      (
        title,
        description,
        created_by
      )
      VALUES (?, ?, ?)
      `,
      [
        title,
        description,
        req.user.id,
      ]
    );

    res.status(201).json({
      message:
        "Project created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProjects = async (
  req,
  res
) => {
  try {
    const [projects] = await db.execute(`
      SELECT 
        projects.*,
        users.name AS creator_name
      FROM projects
      LEFT JOIN users
      ON projects.created_by = users.id
      ORDER BY projects.id DESC
    `);

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProject = async (
  req,
  res
) => {
  try {
    const { title, description } =
      req.body;

    await db.execute(
      `
      UPDATE projects
      SET
        title = ?,
        description = ?
      WHERE id = ?
      `,
      [
        title,
        description,
        req.params.id,
      ]
    );

    res.json({
      message:
        "Project updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProject = async (
  req,
  res
) => {
  try {
    await db.execute(
      `
      DELETE FROM projects
      WHERE id = ?
      `,
      [req.params.id]
    );

    res.json({
      message:
        "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};