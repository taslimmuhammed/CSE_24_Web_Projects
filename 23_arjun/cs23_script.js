class CS23_PuzzleGame {
    constructor() 
    {
        this.cs23_emptyposition = 9;
        this.cs23_buttons = document.querySelectorAll('.cs23_grid button');
        this.cs23_buttons.forEach(cs23_button => {
            cs23_button.addEventListener('click', () => this.cs23_handleButtonClick(cs23_button));
        });
        document.getElementById('cs23_scramblebutton').addEventListener('click', ()=>
        {   
            this.cs23_GenerateScramble();
            this.cs23_EnableButtons();
            document.getElementById("cs23_resulttext").textContent="";

        });
    }

    cs23_handleButtonClick(cs23_button) 
    {
        const cs23_buttonid = Number(cs23_button.id[5]);
        if (this.cs23_CheckNeighbourEmpty(cs23_buttonid)) {
            this.cs23_ChangeEmptyBlock(cs23_buttonid);
            this.cs23_CheckIfSolved();
        }
    }

    cs23_CheckNeighbourEmpty(cs23_buttonid) 
    {
        if (
            cs23_buttonid + 3 === this.cs23_emptyposition ||
            cs23_buttonid - 3 === this.cs23_emptyposition ||
            cs23_buttonid + 1 === this.cs23_emptyposition ||
            cs23_buttonid - 1 === this.cs23_emptyposition
        ) {
            return true;
        }
        return false;
    }

    cs23_ChangeEmptyBlock(cs23_buttonid) 
    {
        const cs23_emptybutton = document.getElementById(`cs23_${this.cs23_emptyposition}`);
        const cs23_currentbutton = document.getElementById(`cs23_${cs23_buttonid}`);

        cs23_emptybutton.textContent = cs23_currentbutton.textContent;
        cs23_currentbutton.textContent = '';
        this.cs23_emptyposition = cs23_buttonid;
    }

    cs23_GenerateScramble() 
    {
        const cs23_buttonText = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
        cs23_buttonText.push('');

        this.cs23_ShuffleArray(cs23_buttonText);

        this.cs23_buttons.forEach((cs23_button, cs23_index) => {
            if (cs23_buttonText[cs23_index] === '') {
                this.cs23_emptyposition = Number(cs23_button.id[5]);
            }
            cs23_button.textContent = cs23_buttonText[cs23_index];
        });
        document.getElementById("cs23_resulttext").textContent = "";
        
    }

    cs23_ShuffleArray(cs23_array) 
    {
        for (let cs23_i = cs23_array.length - 1; cs23_i > 0; cs23_i--) {
            const cs23_j = Math.floor(Math.random() * (cs23_i + 1));
            [cs23_array[cs23_i], cs23_array[cs23_j]] = [cs23_array[cs23_j], cs23_array[cs23_i]];
        }
    }

    cs23_CheckIfSolved()
    {   let cs23_flag =0;
        for(let cs23_i = 1;cs23_i<=8;cs23_i++)
        {   
            let cs23_tempbutton = document.getElementById("cs23_"+cs23_i.toString());
            if(Number(cs23_tempbutton.textContent)!=cs23_i&&cs23_i)
            {
                cs23_flag=1;
                break;
            }
        }
       
        if(cs23_flag==0)
        {
            document.getElementById("cs23_resulttext").textContent = "CONGRATS!! YOU HAVE SOLVED THE PUZZLE!";
            this.cs23_DisableButtons();
        }
        
    }
    cs23_DisableButtons() 
    {
        this.cs23_buttons.forEach(cs23_button => {
            cs23_button.disabled = true;
        });
    }

    cs23_EnableButtons() 
    {
        this.cs23_buttons.forEach(cs23_button => {
            cs23_button.disabled = false;
        });
    }
}

const cs23_game = new CS23_PuzzleGame();
