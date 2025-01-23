export const getCloudinaryVideoUrl = (courseId: string) => {  
  const baseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_BASE_URL;  
  
  const videoMap: { [key: string]: string } = {  
    '1': 'v1737433507/course1_fofbdn.mp4',  
    '2': 'v1737433591/course2_sbvjqy.mp4',  
    '3': 'v1737433655/course3_hs3vxl.mp4',  
    '4': 'v1737433712/course4_bkbzmu.mp4',  
    '5': 'v1737433720/course5_kda2fi.mp4',  
    '6': 'v1737433743/course6_ycdqrb.mp4'  
  };  

  return videoMap[courseId]   
    ? `${baseUrl}/${videoMap[courseId]}`   
    : '';  
}; 