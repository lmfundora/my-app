"use client"
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  buttonsColor: string;
}

export function SearchDialog({ buttonsColor }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant={"ghost"} onClick={ ()=>{setOpen(!open)}}>
        <FaSearch size={18} color={buttonsColor}/>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem></CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
