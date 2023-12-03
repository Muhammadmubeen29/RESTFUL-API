const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let items = [
	{ id: 123, name: "Coconut" },
	{ id: 456, name: "Dates" },
	{ id: 789, name: "Apple" },
	{ id: 112, name: "Orange" },
	{ id: 345, name: "Banana" },
	{ id: 678, name: "Mango" },
	{ id: 901, name: "Grapes" },
	{ id: 234, name: "Strawberry" },
	{ id: 567, name: "Pineapple" },
];

const itemsRouter = express.Router();

itemsRouter.get("/", (req, res) => res.json(items));

itemsRouter.get("/:id", (req, res) => {
	const item = items.find((item) => item.id === parseInt(req.params.id));
	res.json(item || { message: "Item not found" });
});

itemsRouter.post("/", (req, res) => {
	const newItem = req.body;
	items.push(newItem);
	res.status(201).json(newItem);
});

itemsRouter.put("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const updatedItem = req.body;
	const itemIndex = items.findIndex((item) => item.id === id);
	if (itemIndex !== -1) {
		items[itemIndex] = { ...items[itemIndex], ...updatedItem };
		res.json(items[itemIndex]);
	} else {
		res.status(404).json({ message: "Item not found" });
	}
});

itemsRouter.delete("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const deletedIndex = items.findIndex((item) => item.id === id);
	if (deletedIndex !== -1) {
		const deletedItem = items.splice(deletedIndex, 1)[0];
		res.json({ message: "Item deleted", deletedItem });
	} else {
		res.status(404).json({ message: "Item not found" });
	}
});

app.use("/items", itemsRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
