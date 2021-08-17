

const rs = require('../game/rotation_system');


beforeEach(() => {

});


test('rotate right test', () => {
	expect(
		rs.rotateRight(
			[
				[1, 2, 3],
				[0, 0, 0],
				[0, 0, 0]
			]
		)
	).toStrictEqual(
		[
			[0, 0, 1],
			[0, 0, 2],
			[0, 0, 3]
		]
	)
});

test('rotate T test', () => {
	expect(
		rs.rotateRight(
			[
				[0, 0, 0],
				[2, 2, 2],
				[0, 2, 0]
			]
		)
	).toStrictEqual(
		[
			[0, 2, 0],
			[2, 2, 0],
			[0, 2, 0]
		]
	)
});


test('rotate S test 1', () => {
	expect(
		rs.rotateRight(
			[
				[0, 0, 0],
				[0, 2, 2],
				[2, 2, 0]
			]
		)
	).toStrictEqual(
		[
			[2, 0, 0],
			[2, 2, 0],
			[0, 2, 0]
		]
	)
});


test('rotate S test 2', () => {
	expect(
		rs.rotateRight(
			[
				[2, 0, 0],
				[2, 2, 0],
				[0, 2, 0]
			]
		)
	).toStrictEqual(
		[
			[0, 2, 2],
			[2, 2, 0],
			[0, 0, 0]
		]
	)
});

test('rotate S test 3', () => {
	expect(
		rs.rotateRight(
			[
				[0, 2, 2],
				[2, 2, 0],
				[0, 0, 0]
			]
		)
	).toStrictEqual(
		[
			[0, 2, 0],
			[0, 2, 2],
			[0, 0, 2]
		]
	)
});


test('rotate S test 4', () => {
	expect(
		rs.rotateRight(
			[
				[0, 2, 0],
				[0, 2, 2],
				[0, 0, 2]
			]
		)
	).toStrictEqual(
		[
			[0, 0, 0],
			[0, 2, 2],
			[2, 2, 0]
		]
	)
});






