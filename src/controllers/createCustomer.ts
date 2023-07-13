

export async function createCustomerController(req: any, res: any) {
  try {
    const { db } = req.app;

    const { name, email, phone, address } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (phone && phone.length > 10) {
      return res.status(400).json({ message: 'Phone number cannot be longer than 10 digits' });
    }
    
    if (address && address.length > 100) {
      return res.status(400).json({ message: 'Address must be less than 100 characters' });
    }

    // check if customer exists

    const existingCustomer = await db.collection('customers').findOne({
      email: email.toLowerCase()
    });

    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    const result = await db.collection('customers').insertOne({
      name,
      email: email.toLowerCase(),
      phone,
      address
    });

    if (result.acknowledged) {
      res.status(200).json({ message: 'Customer created' });
    } else {
      throw new Error('Customer not created');
    }

  }
  catch(error) {
    res.status(500).json({ error: error.toString() });
  }
}