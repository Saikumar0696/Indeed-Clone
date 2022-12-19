export const timeDifference = (postedDate)=>{
        const now = new Date().getTime()
        let msPerMinute = 60 * 1000,
            msPerHour = msPerMinute * 60,
            msPerDay = msPerHour * 24,
            msPerMonth = msPerDay * 30,
            msPerYear = msPerDay * 365,
            elapsed = now - postedDate;
            
        return (
                
                elapsed < msPerMinute) ?
                Math.round(elapsed / 1000) !== 1 ? 
                Math.round(elapsed / 1000)+ ` seconds ago` :   
                Math.round(elapsed / 1000)+ ` second ago`
                
                :

                (elapsed < msPerHour) ?
                Math.round(elapsed / msPerMinute) !== 1 ?
                Math.round(elapsed / msPerMinute) + ` minutes ago` :   
                Math.round(elapsed / msPerMinute) + ` minute ago`  
                
                :(elapsed < msPerDay) ?
                Math.round(elapsed / msPerHour) !== 1 ? 
                Math.round(elapsed / msPerHour) + ` hours ago`   
                : Math.round(elapsed / msPerHour) + ` hour ago`    
                
                : (elapsed < msPerMonth) ?
                Math.round(elapsed / msPerDay) !== 1 ?
                Math.round(elapsed / msPerDay) + ` days ago`   
                : Math.round(elapsed / msPerDay) + ` day ago`  
                
                :(elapsed < msPerYear) ? 
                Math.round(elapsed / msPerMonth) !== 1 ?
                Math.round(elapsed / msPerMonth) + ` months ago`
                :Math.round(elapsed / msPerMonth) + ` month ago`
        
                :Math.round(elapsed / msPerYear) !== 1 ?
                Math.round(elapsed / msPerYear) + ` years ago`   
                :Math.round(elapsed / msPerYear) + ` year ago`   
        }

