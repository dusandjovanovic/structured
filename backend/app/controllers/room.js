const Room = require("../models/room");

exports.get = function(request, response, next) {
	const { mode } = request.params;
	if (!mode) return next({ message: "Mode key is required in params." });

	if (mode == "all")
		Room.find(function(error, rooms) {
			if (error) return next(error);
			else
				response.json({
					success: true,
					data: rooms
				});
		});
	else
		Room.find({ roomType: mode }, function(error, rooms) {
			if (error) return next(error);
			else
				response.json({
					success: true,
					data: rooms
				});
		});
};

exports.getRoomByName = function(request, response, next) {
	const { name } = request.params;
	if (!name) return next({ message: "Name key is required in params." });

	Room.findOne({ name: name }, function(error, room) {
		if (error) return next(error);
		else
			response.json({
				success: true,
				data: room
			});
	});
};

exports.getGraphByName = function(request, response, next) {
	const { name } = request.params;
	if (!name) return next({ message: "Name key is required in params." });

	Room.findOne({ name: name }, function(error, room) {
		if (error) return next(error);
		else
			response.json({
				success: true,
				graph: room.graph
			});
	});
};

exports.putGraph = function(request, response, next) {
	const { name } = request.params;
	const { graph } = request.body;
	if (!name || !graph)
		return next({
			message:
				"Name key is required in params. Graph key is required in body."
		});

	Room.update({ name: name }, { $set: { graph: graph } }, function(error) {
		if (error) return next(error);
		else
			response.json({
				success: true,
				message: "Graph on room entity updated successfully."
			});
	});
};

exports.postCreate = function(request, response, next) {
	const { name, maxUsers, createdBy, roomType } = request.body;
	if (!name || !maxUsers || !createdBy || !roomType)
		return next({
			message:
				"Name, maxUsers, createdBy and roomType are required in body."
		});

	Room.create(
		{
			name: name,
			roomType: roomType,
			currentUsers: 1,
			maxUsers: maxUsers,
			createdBy: createdBy,
			users: [createdBy],
			graph: {
				nodes: [],
				edges: []
			}
		},
		function(error) {
			if (error) return next(error);
			else
				response.json({
					success: true,
					message:
						"Room created successfully. You are a room master now."
				});
		}
	);
};

exports.postJoin = function(request, response, next) {
	const { roomName, username } = request.body;
	if (!roomName || !username)
		return next({ message: "RoomName and username are required in body." });

	Room.findOne({ name: roomName }, function(error, room) {
		if (error) return next(error);
		else if (!room)
			return next({
				message: "Room with the name provided was not found."
			});
		else {
			if (room.currentUsers === room.maxUsers)
				return next({
					message: "Room is full. You cannot join at this time."
				});
			else
				Room.update(
					{ name: roomName },
					{
						currentUsers: room.currentUsers + 1,
						$push: { users: username }
					},
					function(error) {
						if (error) return next(error);
						else
							response.json({
								success: true,
								message: username + " has joined the room."
							});
					}
				);
		}
	});
};

exports.postLeave = function(request, response, next) {
	const { roomName, username } = request.body;
	if (!roomName || !username)
		return next({ message: "RoomName and username are required in body." });

	Room.findOne({ name: roomName }, function(error, room) {
		if (error) return next(error);
		else if (!room)
			return next({
				message: "Room with the name provided was not found."
			});
		else {
			if (room.users.includes(username)) {
				const index = room.users.indexOf(username);
				room.users.splice(index, 1);
				const currentUsers = room.currentUsers - 1;
				if (currentUsers === 0) {
					Room.deleteOne({ name: roomName }, function(error) {
						if (error) return next(error);
						else
							response.json({
								success: true,
								message:
									username +
									" has deleted the room. You will now leave.",
								newMaster: null
							});
					});
				} else
					Room.update(
						{ name: roomName },
						{
							currentUsers: currentUsers,
							users: room.users
						},
						function(error) {
							if (error) return next(error);
							else {
								let newMaster = null;
								if (room.createdBy === username)
									newMaster = room.users[0];
								Room.update(
									{ name: roomName },
									{
										createdBy: newMaster
									},
									function(error) {
										if (error) return next(error);
										else
											response.json({
												success: true,
												message:
													username +
													" has left the room.",
												newMaster: newMaster
											});
									}
								);
							}
						}
					);
			} else
				return next({
					message:
						"User with the username provided is not in the room."
				});
		}
	});
};

exports.delete = function(request, response, next) {
	const { id } = request.params;
	if (!id) return next({ message: "Id key is required in params." });

	Room.deleteOne({ _id: id }, function(error) {
		if (error) return next(error);
		else
			response.json({
				success: true,
				message: "Room deleted successfully."
			});
	});
};
