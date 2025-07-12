import type {Component} from "svelte";
import {Boxes, CircleUserRound, LayoutDashboard, Settings, Users} from "@lucide/svelte";

export type NavItem = {
    title: string;
    href: string;
    icon?: Component;
}

export const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: 'dashboard', icon: LayoutDashboard },
    { title: 'Hosts', href: 'hosts', icon: Boxes },
    { title: 'Users', href: 'users', icon: Users },
];

export const userNavItems: NavItem[] = [
    { title: 'Account', href: 'account', icon: CircleUserRound },
    { title: 'Settings', href: 'settings', icon: Settings },
];

export { default as NavMain } from './nav-main.svelte';
export { default as NavUser } from './nav-user.svelte';