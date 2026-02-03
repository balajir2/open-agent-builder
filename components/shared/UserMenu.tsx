"use client";

import { signOut, useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, User, Server } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export function UserMenu() {
    const { data: session } = useSession();
    const storeUser = useMutation(api.users.store);

    useEffect(() => {
        if (session?.user) {
            storeUser({
                email: session.user.email || undefined,
                name: session.user.name || undefined,
            });
        }
    }, [session, storeUser]);

    if (!session?.user) return null;

    // Get initials for avatar
    const initials = session.user.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'U';

    // Determine environment based on Convex URL
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || '';
    const isProduction = convexUrl.includes('sensible-ermine-579');
    const isDevelopment = convexUrl.includes('disciplined-quail-9');

    const environment = isProduction ? 'Production' : isDevelopment ? 'Development' : 'Unknown';
    const environmentColor = isProduction
        ? 'bg-red-100 text-red-700 border-red-200'
        : isDevelopment
            ? 'bg-blue-100 text-blue-700 border-blue-200'
            : 'bg-gray-100 text-gray-700 border-gray-200';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-3 h-auto py-2 px-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Avatar className="h-25 w-25 border-2 border-gray-200">
                        <AvatarImage src={session.user.image ?? ""} alt={session.user.name ?? ""} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 text-white text-sm font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left max-w-[180px]">
                        <span className="text-sm font-medium text-gray-900 truncate w-full">
                            {session.user.name}
                        </span>
                        <span className="text-xs text-gray-500 truncate w-full">
                            {session.user.email}
                        </span>
                    </div>
                    <ChevronDown className="h-16 w-16 text-gray-400 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-90 z-[150]" align="end" sideOffset={8} forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-24 w-24 border-2 border-gray-200">
                            <AvatarImage src={session.user.image ?? ""} alt={session.user.name ?? ""} />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 text-white font-semibold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1 flex-1 min-w-0">
                            <p className="text-sm font-semibold leading-none text-gray-900">
                                {session.user.name}
                            </p>
                            <p className="text-xs leading-none text-gray-500 truncate">
                                {session.user.email}
                            </p>
                            <div className={`inline-flex items-center gap-1.5 px-3 py-3 mt-2 rounded-md text-xs font-medium border ${environmentColor}`}>
                                <Server className="h-15 w-15" />
                                <span>{environment}</span>
                            </div>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer p-3">
                    <User className="mr-3 h-15 w-15 text-gray-500" />
                    <span className="text-sm">Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="cursor-pointer p-3 text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                    <LogOut className="mr-3 h-15 w-15" />
                    <span className="text-sm font-medium">Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
