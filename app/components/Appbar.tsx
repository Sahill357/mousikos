"use client";

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Music } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"


export default function Appbar() {
  const session = useSession();

  return (
    <div className="flex justify-between items-center p-4" style={{ backgroundColor: '#111827' }}>
      {/* Left Side: Logo */}
      <Link className="flex items-center" href="#">
        <Music className="h-6 w-6 mr-2 text-purple-400" />
        <span className="font-bold text-purple-400">Mousikos</span>
      </Link>

      {/* Right Side: Sign-in/Sign-out Button */}
      {session.data?.user ? (
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => signIn()}>
          Sign In
        </Button>
      )}
    </div>
  );
}
