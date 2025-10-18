'use client'
import { TextField,TextArea,Button} from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm{
  title:string;
  description:string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {register,control,handleSubmit} = useForm<IssueForm>();
  console.log(register('title'))

  return (
    <form 
      className="max-w-xl space-y-3 p-3" 
      onSubmit={handleSubmit(async (data)=>
       {
        await axios.post('/api/issues',data);
        router.push('/issues')
       })
       }>
        <TextField.Root placeholder="Search the docs…" {...register('title')}>
           <TextField.Slot>
	        </TextField.Slot>
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({field})=><SimpleMDE
                        id="your-custom-id"
                        label="Your label"
                        options={{
                          autofocus: true,
                          spellChecker: false
                        }} {...field}
                      />}
        ></Controller>

        <Button>Submit</Button>

    </form>
  )
}

export default NewIssuePage