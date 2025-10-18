'use client'
import { TextField,TextArea,Text,Button,Callout} from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/createIssueSchema";
// interface IssueForm{
//   title:string;
//   description:string;
// }
import {z} from 'zod'
import Spinner from "@/app/components/Spinner"
type IssueForm = z.infer<typeof createIssueSchema>;
const NewIssuePage = () => {
  const router = useRouter();
  const {register,control,handleSubmit, formState:{errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error,setError] = useState('');
  const [isSpinning,setIsSpinning] = useState(false);
  console.log(register('title'))

  return (
    <div className="max-w-xl">
        {error && <Callout.Root color="red">
                    <Callout.Text>
                      {error}
                    </Callout.Text>
                  </Callout.Root>}

      <form 
        className=" space-y-3 p-3" 
        onSubmit={handleSubmit(async (data)=>{
          try {
            setIsSpinning(true);
            await axios.post('/api/issues',data);
            router.push('/issues')
          } catch (error) {
            setIsSpinning(false);
            setError('An unexpected error occured')
            console.log(error)
          }
        })
        }>
          <TextField.Root placeholder="Title" {...register('title')}>
            <TextField.Slot>
            </TextField.Slot>
          </TextField.Root>
          {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
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
          {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
          <Button disabled={isSpinning}>Submit {isSpinning && <Spinner/>}</Button>

      </form>
    </div>
  )
}

export default NewIssuePage