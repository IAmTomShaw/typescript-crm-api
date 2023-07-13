

export async function getCustomersController(req: any, res: any) {
  try {
    const { db } = req.app;

    const result = await db.collection('customers').find().toArray();

    res.status(200).json({
      message: "Customers retrieved",
      customers: result
    });

  }
  catch(error) {
    res.status(500).json({ error: error.toString() });
  }
}