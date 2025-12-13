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
import { ChevronDown, LogOut, User } from "lucide-react";

export function UserMenu() {
    const { data: session } = useSession();

    if (!session?.user) return null;

    // Get initials for avatar
    const initials = session.user.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'U';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-3 h-auto py-2 px-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Avatar className="h-8 w-8 border-2 border-gray-200">
                        <AvatarImage src={session.user.image ?? ""} alt={session.user.name ?? ""} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-500 text-white text-sm font-semibold">
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
                    <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 z-[150]" align="end" sideOffset={8} forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-gray-200">
                            <AvatarImage src={session.user.image ?? ""} alt={session.user.name ?? ""} />
                            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-500 text-white font-semibold">
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
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer p-3">
                    <User className="mr-3 h-4 w-4 text-gray-500" />
                    <span className="text-sm">Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="cursor-pointer p-3 text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="text-sm font-medium">Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
