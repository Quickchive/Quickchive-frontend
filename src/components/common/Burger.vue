<template>
	<div
		id="burger"
		:class="{
			active: active,
		}"
		@click="toggleActive"
	>
		<button type="button" class="burger__button" title="Menu">
			<span class="burgerbar burgerbar--1"></span>
			<span class="burgerbar burgerbar--2"></span>
			<span class="burgerbar burgerbar--3"></span>
		</button>
	</div>
</template>

<script>
export default {
	name: 'Burger',
	props: {
		active: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	methods: {
		toggleActive() {
			this.$emit('toggle-menu');
			window.scrollTo(0, 0);
		},
	},
};
</script>

<style></style>
